
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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
            <span className="text-white">amazon</span>
            <span className="text-[#FF9900] ml-1">firetv</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            {showMFA ? 'Enter verification code' : 'Sign in to your account'}
          </CardDescription>
        </CardHeader>
        
        {!showMFA ? (
          <form onSubmit={handleLogin}>
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-amazon-orange hover:bg-amazon-orange/80 text-black"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
              <p className="text-gray-400 text-center">
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-amazon-orange hover:underline"
                >
                  Sign up
                </button>
              </p>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleMFAVerification}>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-gray-400 mb-4">
                  We've sent a 6-digit code to {email}
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
                className="w-full bg-amazon-orange hover:bg-amazon-orange/80 text-black"
                disabled={isLoading || mfaCode.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
              <button 
                type="button"
                onClick={() => setShowMFA(false)}
                className="text-gray-400 hover:text-white"
              >
                Back to login
              </button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Login;
