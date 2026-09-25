import sys
from pathlib import Path

# Allow backend to access the existing scanner
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))
sys.path.insert(0, str(PROJECT_ROOT / "scanner"))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from botocore.exceptions import NoCredentialsError, ClientError

from scanner.main import run_scan


app = FastAPI(title="AWS Security Scanner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "AWS Security Scanner API"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/scan")
def scan_aws():
    try:
        return run_scan()
    except NoCredentialsError:
        raise HTTPException(
            status_code=401,
            detail="AWS credentials not configured. Please configure AWS credentials using 'aws configure' or set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables."
        )
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        error_msg = e.response.get('Error', {}).get('Message', str(e))
        
        if error_code == 'UnauthorizedOperation':
            raise HTTPException(
                status_code=403,
                detail=f"AWS access denied: {error_msg}. Please check IAM permissions."
            )
        elif error_code == 'InvalidClientTokenId':
            raise HTTPException(
                status_code=401,
                detail="Invalid AWS credentials. Please verify your AWS_ACCESS_KEY_ID."
            )
        elif error_code == 'SignatureDoesNotMatch':
            raise HTTPException(
                status_code=401,
                detail="Invalid AWS credentials. Please verify your AWS_SECRET_ACCESS_KEY."
            )
        else:
            raise HTTPException(
                status_code=500,
                detail=f"AWS error ({error_code}): {error_msg}"
            )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Scan failed: {str(e)}"
        )