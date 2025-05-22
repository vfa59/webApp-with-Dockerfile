FROM python:3.10-slim
WORKDIR /app
COPY . .
RUN pip install flask flask-cors
EXPOSE 8080
CMD ["python", "app.py"]
