export default function handler(req, res) {
    const data = req.body['input']
    res.status(200).json({ text: "Hello from LLAM2.You have sent data " + data });
}