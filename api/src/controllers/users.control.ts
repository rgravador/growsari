import { isEmpty } from '../middlewares/required';
import Users from '../models/user.model';
import { Request, Response } from 'express';
import { loginService, registerService } from '../services/user.service';


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (isEmpty(email) || isEmpty(password)) {
            return res.json({
                status: 400,
                message: 'Email and password are required'
            })
        }
        const loggingIn = await loginService(email, password);
        if (loggingIn.error) return res.json(loggingIn)
        return res.json({ ...loggingIn });
    } catch (error) {
        res.json({ message: 'Server error', error });
    }
}
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        if (isEmpty(email)) return res.json({ error: true, message: 'Email is required' });
        if (isEmpty(password)) return res.json({ error: true, message: 'Password is required' });
        if (isEmpty(name)) return res.json({ error: true, message: 'Name is required' });
        const register = await registerService(req.body);
        if (register.error) return res.json(register)
        return res.status(201).json({ error: false, message: 'Registration successful', data: register });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}