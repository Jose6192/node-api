const { Router } = require('express');
const router = Router();
const path = require('path');

router.get('/imagen/:imageName', (req, res) => {
    const imageName = req.params.imageName; 
    const imagePath = path.join(__dirname, '../public/uploads/' + imageName);
    res.sendFile(imagePath);
});

module.exports = router;
