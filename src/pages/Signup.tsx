
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setShowMFA(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleMFAVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate MFA verification
    setTimeout(() => {
      if (mfaCode.length === 6) {
        navigate('/home');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">
            <span className="text-red-500">Stream</span>Flix
          </CardTitle>
          <CardDescription className="text-gray-400">
            {showMFA ? 'Verify your email' : 'Create your account'}
          </CardDescription>
        </CardHeader>
        
        {!showMFA ? (
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <p className="text-gray-400 text-center">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-red-500 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleMFAVerification}>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-gray-400 mb-4">
                  We've sent a 6-digit verification code to {email}
                </p>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={mfaCode}
                    onChange={(value) => setMfaCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="bg-gray-800 border-gray-700 text-white" />
                      <InputOTPSlot index={1} className="bg-gray-800 border-gray-700 text-white" />
                      <InputOTPSlot index={2} className="bg-gray-800 border-gray-700 text-white" />
                      <InputOTPSlot index={3} className="bg-gray-800 border-gray-700 text-white" />
                      <InputOTPSlot index={4} className="bg-gray-800 border-gray-700 text-white" />
                      <InputOTPSlot index={5} className="bg-gray-800 border-gray-700 text-white" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading || mfaCode.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify & Create Account'}
              </Button>
              <button 
                type="button"
                onClick={() => setShowMFA(false)}
                className="text-gray-400 hover:text-white"
              >
                Back to signup
              </button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Signup;
