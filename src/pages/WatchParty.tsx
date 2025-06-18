
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, UserPlus, Crown, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Member {
  id: number;
  name: string;
  status: string;
  isLeader: boolean;
}

const WatchParty = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [partyCreated, setPartyCreated] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Siddhant O. (You)', status: 'Host', isLeader: true },
  ]);
  const [pendingMembers, setPendingMembers] = useState([
    { id: 2, name: 'Sarah K.', status: 'Pending' },
    { id: 3, name: 'Mike R.', status: 'Pending' },
  ]);

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(code);
    setPartyCreated(true);
  };

  const acceptMember = (memberId: number) => {
    const member = pendingMembers.find(m => m.id === memberId);
    if (member) {
      setMembers([...members, { ...member, status: 'Connected', isLeader: false }]);
      setPendingMembers(pendingMembers.filter(m => m.id !== memberId));
    }
  };

  const rejectMember = (memberId: number) => {
    setPendingMembers(pendingMembers.filter(m => m.id !== memberId));
  };

  const joinLounge = () => {
    if (roomCode.trim()) {
      navigate(`/home?lounge=true`);
    }
  };

  const startWatching = () => {
    navigate(`/home?lounge=true`);
  };

  if (partyCreated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/home')}
              className="text-white hover:text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold">Your Lounge</h1>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">Lounge Code</h2>
              <div className="text-3xl font-mono bg-[#146EB4] text-white px-6 py-3 rounded-lg inline-block">
                {generatedCode}
              </div>
              <p className="text-gray-400 mt-2">Share this code with friends to join your lounge</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Members ({members.length})
            </h3>
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#146EB4] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.status}</p>
                    </div>
                  </div>
                  {member.isLeader && (
                    <Crown className="w-5 h-5 text-[#FF9900]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {pendingMembers.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Pending Requests ({pendingMembers.length})
              </h3>
              <div className="space-y-3">
                {pendingMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-400">{member.status}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => acceptMember(member.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectMember(member.id)}
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={startWatching}
            className="w-full bg-[#FF9900] hover:bg-[#FF9900]/80 text-black py-3 text-lg font-semibold"
          >
            Start Watching Together
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/home')}
            className="text-white hover:text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-4">Join a Lounge</h1>
          <p className="text-gray-400">Watch movies and shows together and chat with friends</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Enter Lounge Code</h2>
          <Input
            placeholder="Enter 6-digit code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="mb-4 text-center text-lg font-mono bg-gray-700 border-gray-600 text-white"
            maxLength={6}
          />
          <Button
            onClick={joinLounge}
            disabled={roomCode.length !== 6}
            className="w-full bg-[#146EB4] hover:bg-[#146EB4]/80 text-white"
          >
            Join Lounge
          </Button>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">Or</p>
          <Button
            onClick={generateRoomCode}
            className="w-full bg-[#FF9900] text-black hover:bg-[#FF9900] hover:text-white"
          >
            Create New Lounge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WatchParty;
