# BetterChessArbiter (in progress)

BetterChessArbiter is a full-stack application for managing chess tournaments. The application offers modern design, intuitive user interface, and a range of features to facilitate organization and participation in tournaments.

## Features

- User registration and login
- Tournament management:
  - Browsing available tournaments
  - Adding tournaments to favorites
  - Creating custom tournaments (for users with Organizer role)
- Managing favorite tournaments
- Verifying submitted tournaments (for users with Moderator role)
- Managing users (for users with Admin role)
- JWT token-based authentication

## Technologies

- Backend:
  - .NET 7+
  - Entity Framework Core
  - MongoDB
- Frontend:
  - TypeScript
  - React
  - Tailwind CSS

## Installation

1. Clone the repository to your local machine.
2. Navigate to the bcaAPI folder - this folder contains REST API application that needs to be running in the background, however you need to configure secrets.json first:
  1. In Visual Studio right click on bcaAPI
  2. Click "Manage users secret keys
  3. Configure the file like so:
    ```
{
  "JwtSettings": {
    "Issuer": "https://localhost:7001",
    "Audience": "https://localhost:5173/*",
    "Key": "<Here enter your JWT encryption key, this could be any string, just make sure it's at least 20 characters long. You also may leave it as it is now since this string also counts as key.>",
    "ExpirationMinutes": 1,
    "RefreshExpirationMinutes": 5
  },
  "MongoDBSettings": {
    "AtlasURI": "<Here you need to add connection string for mongoDB>",
    "DatabaseName": "BetterChessArbiter"
  }
}
    ```
  4. Now you can run your application. The API should run at [http://localhost:7001](http://localhost:7001/swagger/index.html)
5. Head into betterchessarbiter-front folder, open with visual studio code and install dependencies:
   ```
   npm install
   ```
7. Run the frontend:
   ```
   npm start
   ```
8. Open your browser and go to [http://localhost:5173](http://localhost:5173).

## Contributions

If you'd like to contribute to the development of the BetterChessArbiter project, feel free to submit issues and pull requests (PRs).

## Author

BetterChessArbiter was created by [Piotr Śliwa](github.com/fullstackpete).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
