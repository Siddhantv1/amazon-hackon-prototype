import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Users, Copy, Check, UserCheck, UserX, Play, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WatchParty = () => {
  const [view, setView] = useState<'select' | 'create' | 'join' | 'lobby'>('select');
  const [partyCode, setPartyCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [partyName, setPartyName] = useState('');
  const [isLeader, setIsLeader] = useState(false);
  const [copied, setCopied] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, name: 'James M. (You)', status: 'accepted', isLeader: true },
  ]);
  const [pendingMembers, setPendingMembers] = useState([
    { id: 2, name: 'Alice Johnson', status: 'pending' },
    { id: 3, name: 'Bob Smith', status: 'pending' },
  ]);
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  const navigate = useNavigate();

  const generatePartyCode = () => {
    return Math.random().toString().substr(2, 6);
  };

  const handleCreateParty = () => {
    const code = generatePartyCode();
    setPartyCode(code);
    setIsLeader(true);
    setView('lobby');
  };

  const handleJoinParty = () => {
    if (joinCode.length === 6) {
      setPartyCode(joinCode);
      setIsLeader(false);
      setMembers([
        { id: 1, name: 'Alice (Leader)', status: 'accepted', isLeader: true },
        { id: 2, name: 'James M. (You)', status: 'accepted', isLeader: false },
      ]);
      setView('lobby');
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(partyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMemberAction = (memberId: number, action: 'accept' | 'decline') => {
    const member = pendingMembers.find(m => m.id === memberId);
    if (member && action === 'accept') {
      setMembers([...members, { ...member, status: 'accepted', isLeader: false }]);
    }
    setPendingMembers(pendingMembers.filter(m => m.id !== memberId));
  };

  const startWatching = () => {
    navigate('/home');
  };

  if (view === 'select') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/home')}
              className="absolute top-4 left-4 text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-white mb-2">
              <Users className="w-10 h-10 inline mr-3" />
              Watch Party
            </h1>
            <p className="text-gray-400 text-lg">Stream movies together with friends</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800 hover:border-red-500 transition-colors cursor-pointer" onClick={() => setView('create')}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Create Watch Party</CardTitle>
                <CardDescription className="text-gray-400">
                  Start a new watch party and invite friends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-300 space-y-2">
                  <li>• Be the party leader</li>
                  <li>• Control who joins</li>
                  <li>• Choose what to watch</li>
                  <li>• Sync playback for everyone</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors cursor-pointer" onClick={() => setView('join')}>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Join Watch Party</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter a party code to join friends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-300 space-y-2">
                  <li>• Join with 6-digit code</li>
                  <li>• Watch synchronized content</li>
                  <li>• Chat with friends</li>
                  <li>• Enjoy together</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Create Watch Party</CardTitle>
            <CardDescription className="text-gray-400">
              Set up your watch party room
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partyName" className="text-white">Party Name (Optional)</Label>
              <Input
                id="partyName"
                placeholder="e.g., Movie Night with Friends"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setView('select')}
                variant="outline"
                className="flex-1 border-gray-600 text-white hover:bg-gray-700"
              >
                Back
              </Button>
              <Button 
                onClick={handleCreateParty}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Create Party
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === 'join') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Join Watch Party</CardTitle>
            <CardDescription className="text-gray-400">
              Enter the 6-digit party code
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="joinCode" className="text-white">Party Code</Label>
              <Input
                id="joinCode"
                placeholder="123456"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.slice(0, 6))}
                className="bg-gray-800 border-gray-700 text-white text-center text-2xl tracking-wider"
                maxLength={6}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setView('select')}
                variant="outline"
                className="flex-1 border-gray-600 text-white hover:bg-gray-700"
              >
                Back
              </Button>
              <Button 
                onClick={handleJoinParty}
                disabled={joinCode.length !== 6}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Join Party
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (view === 'lobby') {
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setView('select')}
              className="text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Leave Party
            </Button>
            {isLeader && pendingMembers.length > 0 && (
              <Button 
                onClick={() => setShowPendingDialog(true)}
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                {pendingMembers.length} Pending Requests
              </Button>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {partyName || 'Watch Party Lobby'}
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-gray-400">Party Code:</span>
              <code className="bg-gray-800 px-3 py-1 rounded text-white text-xl tracking-wider">
                {partyCode}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={copyCode}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-gray-400">Share this code with friends to invite them</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-white">{member.name}</span>
                      <div className="flex items-center space-x-2">
                        {member.isLeader && (
                          <Badge className="bg-red-600 text-white">Leader</Badge>
                        )}
                        <Badge className="bg-green-600 text-white">Ready</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Party Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-gray-300">
                  <p className="mb-2">• Synchronized playback</p>
                  <p className="mb-2">• Shared pause/play controls</p>
                  <p className="mb-2">• Real-time chat</p>
                  <p>• HD quality streaming</p>
                </div>
                {isLeader && (
                  <Button 
                    onClick={startWatching}
                    className="w-full bg-red-600 hover:bg-red-700"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Watching
                  </Button>
                )}
                {!isLeader && (
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-400">Waiting for the leader to start...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={showPendingDialog} onOpenChange={setShowPendingDialog}>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Pending Join Requests</DialogTitle>
              <DialogDescription className="text-gray-400">
                Approve or decline members wanting to join your party
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {pendingMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-white">{member.name}</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleMemberAction(member.id, 'accept')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <UserCheck className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMemberAction(member.id, 'decline')}
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <UserX className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return null;
};

export default WatchParty;
