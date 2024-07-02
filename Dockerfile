# Use Python base image
FROM python:3.8-slim

# Set working directory inside the container
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies including requests
RUN pip install --no-cache-dir -r requirements.txt

# Copy the script into the container
COPY capture_traffic.py .

# Set the entry point
CMD ["python", "capture_traffic.py"]

