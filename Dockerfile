# Lightweight Python Container for Phanix
FROM python:3.12-slim

WORKDIR /app

# Copy application files
COPY . /app

# Expose web port (defaults to 8000 or cloud-injected PORT)
EXPOSE 8000

# Start Phanix server
CMD ["python", "server.py"]
