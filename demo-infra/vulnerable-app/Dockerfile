FROM python:3.11-slim

WORKDIR /app

# Install ping and other utilities for command injection demo
RUN apt-get update && apt-get install -y \
    iputils-ping \
    curl \
    net-tools \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY app.py .

# Create directories
RUN mkdir -p /var/log/app /data/files

# Expose port
EXPOSE 5000

CMD ["python", "app.py"]
