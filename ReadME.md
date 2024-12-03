## Running the application

1. Clone the repository:
   ```shell
   git clone https://github.com/zhanna-davtyan/AirFly.git
   cd AirFly
   ```
2. Install docker and start the docker engine

3. Start the database:

   ```shell
   cd .\backend\
   cd .\src\
   cd .\localdev\
   docker compose up --build
   ```

4. Build the backend application:

   ```shell
   cd backend
   .\mvnw clean install
   ```

5. Run the backend application:

   ```shell
   .\mvnw spring-boot:run
   ```

6. Install frontend dependencies:
   ```shell
   cd frontend
   npm install
   ```
7. Run the frontend application:
   ```shell
   npm start
   ```
