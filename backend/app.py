import jwt
import datetime

def generate_jwt_token(secret_key, payload, algorithm='HS256', expires_in=None):
    # Add expiration time if specified
    if expires_in:
        payload['exp'] = datetime.datetime.utcnow() + datetime.timedelta(minutes=expires_in)
    
    # Generate token
    token = jwt.encode(payload, secret_key, algorithm=algorithm)
    
    return token

# Example usage
if __name__ == "__main__":
    # Configuration
    SECRET_KEY = "your-very-secret-key"  # In production, use a strong secret from environment variables
    ALGORITHM = "HS256"
    EXPIRES_IN = 30  # minutes
    
    # Payload data
    payload = {
        "user_id": 12345,
        "username": "john_doe",
        "role": "admin"
    }
    
    # Generate token
    try:
        token = generate_jwt_token(SECRET_KEY, payload, ALGORITHM, EXPIRES_IN)
        print("Generated JWT Token:")
        print(token)
    except Exception as e:
        print(f"Error generating token: {e}")