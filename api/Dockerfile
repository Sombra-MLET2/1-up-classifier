FROM python:3.12-slim

WORKDIR /opt/

COPY . ./api

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r ./api/requirements.txt

EXPOSE 80

CMD ["uvicorn", "api.main:app",\
        "--host", "0.0.0.0",\
        "--port", "80"]