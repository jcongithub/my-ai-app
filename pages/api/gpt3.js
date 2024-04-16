export default function handler(req, res) {
    const data = req.body['input']
    res.status(200).json({ text: "Hello from GPT3.You have sent data " + data });
}