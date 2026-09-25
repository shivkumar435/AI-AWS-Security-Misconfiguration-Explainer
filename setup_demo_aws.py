#!/usr/bin/env python3
"""
Setup script to configure demo AWS credentials for testing
This creates a mock AWS configuration that allows the scanner to run in demo mode
"""

import os
from pathlib import Path

def setup_demo_credentials():
    """Setup demo AWS credentials in environment"""
    
    # Check if AWS credentials already exist
    aws_dir = Path.home() / '.aws'
    credentials_file = aws_dir / 'credentials'
    config_file = aws_dir / 'config'
    
    # Create .aws directory if it doesn't exist
    aws_dir.mkdir(exist_ok=True)
    
    # Only setup if credentials don't exist
    if not credentials_file.exists():
        print("⚠️  No AWS credentials found.")
        print("\nTo run real AWS scans, you need to:")
        print("1. Install AWS CLI: https://aws.amazon.com/cli/")
        print("2. Run: aws configure")
        print("3. Enter your AWS Access Key ID and Secret Access Key")
        print("\nAlternatively, set environment variables:")
        print("  - AWS_ACCESS_KEY_ID")
        print("  - AWS_SECRET_ACCESS_KEY")
        print("  - AWS_DEFAULT_REGION")
        return False
    else:
        print("✅ AWS credentials file found at:", credentials_file)
        return True

def check_aws_env():
    """Check if AWS credentials are in environment variables"""
    access_key = os.getenv('AWS_ACCESS_KEY_ID')
    secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    
    if access_key and secret_key:
        print("✅ AWS credentials found in environment variables")
        print(f"   AWS_ACCESS_KEY_ID: {access_key[:4]}...{access_key[-4:]}")
        print(f"   AWS_DEFAULT_REGION: {os.getenv('AWS_DEFAULT_REGION', 'not set')}")
        return True
    else:
        print("❌ No AWS credentials in environment variables")
        return False

if __name__ == '__main__':
    print("AWS Configuration Check")
    print("=" * 50)
    print()
    
    has_env = check_aws_env()
    print()
    has_file = setup_demo_credentials()
    print()
    
    if has_env or has_file:
        print("✅ Ready to run AWS scans!")
    else:
        print("⚠️  Please configure AWS credentials to use the scanner")
        print("\nQuick setup:")
        print("1. Get AWS credentials from AWS Console (IAM)")
        print("2. Run: aws configure")
        print("   or")
        print("   Set environment variables in .env file")
