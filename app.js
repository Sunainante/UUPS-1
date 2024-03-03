const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Example database (You should replace this with your actual database implementation)
let userRoles = {};

app.use(bodyParser.json());

// Assign Role
app.post('/api/assign-role', (req, res) => {
    const { user_id, role } = req.body;
    if (!user_id || !role) {
        return res.status(400).json({ error: 'Missing user_id or role in request body' });
    }

    userRoles[user_id] = role;
    res.json({ message: `Role ${role} assigned to user ${user_id}` });
});

// Get Roles
app.get('/api/get-roles', (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ error: 'Missing user_id parameter' });
    }

    const roles = userRoles[user_id] ? [userRoles[user_id]] : [];
    res.json({ user_id, roles });
});

// Remove Role
app.delete('/api/remove-role', (req, res) => {
    const { user_id, role } = req.body;
    if (!user_id || !role) {
        return res.status(400).json({ error: 'Missing user_id or role in request body' });
    }

    if (!userRoles[user_id]) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (userRoles[user_id] !== role) {
        return res.status(404).json({ error: `User does not have role ${role}` });
    }

    delete userRoles[user_id];
    res.json({ message: `Role ${role} removed from user ${user_id}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
