import React from 'react';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Award, MoreHorizontal, ChevronUp } from 'lucide-react';

const ShadowAIRealStorySlide = ({ theme: t }) => {
  // Actual Reddit post from r/msp - updated for Feb 2 presentation (5d + 3d = 8d)
  const post = {
    subreddit: "r/msp",
    author: "Sunnyfaldu",
    time: "8d ago",
    upvotes: "66",
    title: "Are clients actually leaking customer data into ChatGPT or is it mostly theoretical",
    body: `I am seeing more clients use ChatGPT and similar tools for day to day work and it often turns into pasting real customer info into prompts. This feels like a real risk because it can include customer lists, phone numbers, emails, ticket notes, or other sensitive details. I am trying to understand if MSPs are seeing this as a real issue across clients or if it is rare. If it is real, what do you actually do that works in practice without turning it into a big enterprise project.`,
    comments: "94"
  };

  const topComment = {
    author: "GullibleDetective",
    badge: "Top 1% Commenter",
    time: "8d ago",
    upvotes: "35",
    body: `One of our technicians was, including email transcripts with ceo, engineers and IP sensitive data. Trying to troubleshoot a dmarc issue.

I busted him using a different clients server to do it since we internally blocked gpt on our servers at our office.

So not only was he leaking sensitive data including engineering emails with all roles ans positions going up to senior leadership. He did this on a different clients server`
  };

  const opReply = {
    author: "Sunnyfaldu",
    isOP: true,
    time: "8d ago",
    upvotes: "14",
    body: `Yeah that is exactly the nightmare scenario with public AI tools. The worst part is not even the AI part, it is the policy bypass plus doing it on a client system.`
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      {/* Reddit logo */}
      <div className="text-center mb-3">
        <img src="/images/reddit-logo.png" alt="Reddit" className="h-12 mx-auto" />
      </div>

      {/* Reddit Post Card - More compact */}
      <div className="max-w-5xl mx-auto flex-1 flex flex-col">
        <div className="bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden shadow-2xl flex-1 flex flex-col">

          {/* Original Post - Condensed */}
          <div className="p-4 border-b border-[#30363d]">
            {/* Post header */}
            <div className="flex items-center gap-2 text-sm mb-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
              <span className="text-[#d7dadc] font-bold">{post.subreddit}</span>
              <span className="text-[#6e7681]">•</span>
              <span className="text-[#6e7681]">{post.author}</span>
              <span className="text-[#6e7681]">•</span>
              <span className="text-[#6e7681]">{post.time}</span>
            </div>

            {/* Post title */}
            <h2 className="text-[#d7dadc] text-xl font-medium mb-2">
              {post.title}
            </h2>

            {/* Post body - full text, smaller font */}
            <p className="text-[#8b949e] text-sm leading-relaxed">
              {post.body}
            </p>

            {/* Stats bar */}
            <div className="flex items-center gap-4 mt-3 text-[#6e7681] text-sm">
              <div className="flex items-center gap-1">
                <ChevronUp className="w-4 h-4" />
                <span>{post.upvotes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments} comments</span>
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="p-4 bg-[#161b22] flex-1">
            {/* THE COMMENT */}
            <div className="flex gap-3 mb-4">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                G
              </div>

              <div className="flex-1">
                {/* Comment header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#d7dadc] font-bold">{topComment.author}</span>
                  <span className="text-xs bg-blue-600/30 text-blue-400 px-1.5 py-0.5 rounded">🏆 {topComment.badge}</span>
                  <span className="text-[#6e7681] text-sm">• {topComment.time}</span>
                </div>

                {/* Comment body - THE STORY - Yellow box only here */}
                <div className="text-[#d7dadc] text-lg leading-relaxed space-y-3 border-2 border-yellow-400/70 rounded p-3">
                  <p>One of our technicians was, including email transcripts with ceo, engineers and IP sensitive data. Trying to troubleshoot a dmarc issue.</p>
                  <p>I busted him using a different clients server to do it since we internally blocked gpt on our servers at our office.</p>
                  <p>So not only was he leaking sensitive data including engineering emails with all roles ans positions going up to senior leadership. He did this on a different clients server</p>
                </div>

                {/* Comment stats */}
                <div className="flex items-center gap-4 mt-3 text-[#6e7681] text-sm">
                  <div className="flex items-center gap-1">
                    <ChevronUp className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-500 font-bold">{topComment.upvotes}</span>
                  </div>
                  <span>Reply</span>
                  <span>Award</span>
                  <span>Share</span>
                </div>
              </div>
            </div>

            {/* OP Reply - outside the yellow box */}
            <div className="ml-12 pl-4 border-l-2 border-[#30363d]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#d7dadc] font-bold">{opReply.author}</span>
                <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">OP</span>
                <span className="text-[#6e7681] text-sm">• {opReply.time}</span>
              </div>
              <p className="text-[#8b949e] text-base">
                {opReply.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadowAIRealStorySlide;
