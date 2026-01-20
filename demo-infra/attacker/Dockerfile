FROM python:3.11-slim

WORKDIR /app

# Install attack tools and utilities
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    netcat-openbsd \
    nmap \
    sqlmap \
    hydra \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Install Python libraries for attack scripts
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy attack scripts
COPY *.py ./

RUN mkdir -p /results

CMD ["tail", "-f", "/dev/null"]
