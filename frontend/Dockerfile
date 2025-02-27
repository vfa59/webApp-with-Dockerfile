FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf  
COPY . /usr/share/nginx/html 

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]