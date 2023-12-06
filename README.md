# Kahoot Botter

This project is a simple Kahoot botter built with Node.js. It uses the `kahoot.js-latest` library to create multiple bots that join a Kahoot game.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
```sh
git clone https://github.com/Squawkykaka/Kahoot-Botter.git
```

2. Navigate to the project directory
```sh
cd kahoot-botter
```

3. Install the dependencies
```sh
npm install
```

## Usage

To start the botter, run the following command:

```sh
node index.js
```

By default, the botter will create 10 bots and join the Kahoot game with the pin `6089412`. You can change these values by modifying the `NUM_BOTS` and `KAHOOT_PIN` variables in `index.js`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.