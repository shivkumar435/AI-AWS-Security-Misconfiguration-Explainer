"""
Demo scanner that provides mock AWS security scan data
Use this when AWS credentials are not available for development/testing
"""

from models.scan_result import ScanResult


class DemoScanner:
    """Provides mock scan results for development without AWS credentials"""
    
    @staticmethod
    def get_demo_s3_results():
        """Generate mock S3 scan results"""
        return [
            ScanResult(
                service="s3",
                resource_id="demo-secure-bucket",
                region="us-east-1",
                configuration={
                    "public_access": {
                        "BlockPublicAcls": True,
                        "IgnorePublicAcls": True,
                        "BlockPublicPolicy": True,
                        "RestrictPublicBuckets": True
                    },
                    "versioning": "Enabled",
                    "encryption": True,
                    "logging": True
                }
            ),
            ScanResult(
                service="s3",
                resource_id="demo-vulnerable-bucket",
                region="us-east-1",
                configuration={
                    "public_access": None,
                    "versioning": "Disabled",
                    "encryption": False,
                    "logging": False
                }
            ),
        ]
    
    @staticmethod
    def get_demo_ec2_results():
        """Generate mock EC2 scan results"""
        return [
            ScanResult(
                service="ec2",
                resource_id="i-demo123456",
                region="us-east-1",
                configuration={
                    "instance_type": "t2.micro",
                    "security_groups": [
                        {
                            "GroupId": "sg-demo123",
                            "IpPermissions": []
                        }
                    ],
                    "public_ip": "54.123.45.67",
                    "monitoring": {"State": "disabled"}
                }
            ),
        ]
    
    @staticmethod
    def get_demo_iam_results():
        """Generate mock IAM scan results"""
        return [
            ScanResult(
                service="iam",
                resource_id="demo-user",
                region="global",
                configuration={
                    "UserName": "demo-user",
                    "MfaActive": False,
                    "AccessKeys": [
                        {
                            "AccessKeyId": "AKIADEMO123",
                            "Status": "Active",
                            "CreateDate": "2024-01-01"
                        }
                    ],
                    "PasswordLastUsed": "2024-01-15"
                }
            ),
            ScanResult(
                service="iam",
                resource_id="secure-user",
                region="global",
                configuration={
                    "UserName": "secure-user",
                    "MfaActive": True,
                    "AccessKeys": [],
                    "PasswordLastUsed": "2024-01-15"
                }
            ),
        ]
    
    @staticmethod
    def get_all_demo_results():
        """Get all demo scan results"""
        return (
            DemoScanner.get_demo_s3_results() +
            DemoScanner.get_demo_ec2_results() +
            DemoScanner.get_demo_iam_results()
        )
