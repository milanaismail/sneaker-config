const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import je User model (bijv. voor het vinden van gebruikers)

// Functie voor het inloggen van een gebruiker en het aanmaken van een token
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Zoek de gebruiker op basis van de gebruikersnaam
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Vergelijk het ingevoerde wachtwoord met het opgeslagen wachtwoord
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Als de inloggegevens correct zijn, maak een JWT-token
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Verstuur het token als reactie
    return res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
