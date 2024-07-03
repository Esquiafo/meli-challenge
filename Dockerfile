FROM python:3.8

# Install iproute2 and other dependencies
RUN apt-get update && \
    apt-get install -y iproute2 && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy your Python script and other necessary files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Command to run your Python script
CMD ["python", "capture_traffic.py"]