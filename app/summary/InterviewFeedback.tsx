const InterviewFeedback = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Mock Interview Performance Assessment
        </h1>
        <div className="text-6xl font-bold text-red-500 mb-2">4.2/10</div>
        <p className="text-lg text-gray-600 bg-yellow-100 px-4 py-2 rounded-lg inline-block">
          Needs Significant Improvement
        </p>
      </div>
      {/* Performance Breakdown */}
      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">
          Performance Breakdown by Category
        </h2>
        <div className="space-y-3">
          {[
            { name: "Communication & Engagement", score: 2.5 },
            { name: "Technical Depth", score: 4.0 },
            { name: "Problem Structure", score: 6.0 },
            { name: "API Design", score: 4.5 },
            { name: "System Architecture", score: 3.5 },
            { name: "Tool Proficiency", score: 2.0 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-40 text-sm font-medium">{item.name}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${(item.score / 10) * 100}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm font-bold">{item.score}/10</div>
            </div>
          ))}
        </div>
      </div>
      {/* Time Usage Description and Ideal Distribution */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Time Usage Description */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">How You Used Your Time</h3>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              The interview began with significant technical difficulties as you
              struggled with basic Excalidraw operations. Nearly{" "}
              <strong>10 minutes</strong> were lost navigating the drawing tool,
              creating shapes, and figuring out how to connect components.
            </p>
            <p>
              You spent a reasonable amount of time gathering functional and
              non-functional requirements, which showed good interview
              structure. However, the discussion remained quite surface-level
              without diving into specific numbers or constraints.
            </p>
            <p>
              When it came to API design, you covered the basics but didn&apos;t
              elaborate on request/response formats, error handling, or
              authentication mechanisms that would demonstrate deeper technical
              understanding.
            </p>
            <p>
              The system architecture phase was where the most critical time was
              needed, but by this point, tool struggles had eaten into your
              available time. The discussion touched on microservices but missed
              essential topics like databases, caching, and scalability
              considerations.
            </p>
            <p>
              Throughout the interview, there were multiple instances of
              confusion or minimal responses when I provided guidance, creating
              awkward silences that further reduced productive discussion time.
            </p>
          </div>
        </div>
        {/* Ideal Distribution Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4">Ideal Time Distribution</h3>
          <div className="flex justify-center mb-6">
            <svg
              width="180"
              height="180"
              viewBox="0 0 200 200"
              className="transform -rotate-90"
            >
              {/* Functional Requirements: 10% (36°) */}
              <path
                d="M 100 100 L 100 20 A 80 80 0 0 1 128.3 26.3 Z"
                fill="#3b82f6"
                className="hover:opacity-80"
              />
              {/* Non-Functional Requirements: 10% (36°) */}
              <path
                d="M 100 100 L 128.3 26.3 A 80 80 0 0 1 153.5 47.1 Z"
                fill="#10b981"
                className="hover:opacity-80"
              />
              {/* API Design: 10% (36°) */}
              <path
                d="M 100 100 L 153.5 47.1 A 80 80 0 0 1 166.5 72.9 Z"
                fill="#f59e0b"
                className="hover:opacity-80"
              />
              {/* System Design Diagram: 70% (252°) */}
              <path
                d="M 100 100 L 166.5 72.9 A 80 80 0 1 1 100 20 Z"
                fill="#ef4444"
                className="hover:opacity-80"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-sm">Functional Requirements (10%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-sm">Non-Functional Requirements (10%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
              <span className="text-sm">API Design (10%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span className="text-sm">System Design Diagram (70%)</span>
            </div>
          </div>
        </div>
      </div>
      {/* Critical Issues */}
      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Critical Issues</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-2">18</div>
            <div className="text-sm">
              Minimal responses or confusion instances
            </div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              8-10 min
            </div>
            <div className="text-sm">Lost on basic diagram operations</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 mb-2">0</div>
            <div className="text-sm">
              Discussion of databases, caching, scaling
            </div>
          </div>
        </div>
      </div>
      {/* What You Did Well */}
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-green-800 mb-4">
          What You Did Well ✓
        </h2>
        <ul className="space-y-2 text-green-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            Covered all essential components: functional requirements,
            non-functional requirements, API design, and system architecture
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            Good architectural intuition about microservices patterns
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            Identified core Instagram features accurately
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            Responded appropriately to my guidance
          </li>
        </ul>
      </div>
      {/* Improvement Priority */}
      <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Improvement Priority Matrix</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-red-300 rounded-lg">
            <h3 className="font-bold text-red-700 mb-2">
              High Impact, Easy to Fix
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Practice Excalidraw</li>
              <li>• Continuous narration</li>
              <li>• Stay engaged</li>
            </ul>
          </div>
          <div className="p-4 border-2 border-orange-300 rounded-lg">
            <h3 className="font-bold text-orange-700 mb-2">
              High Impact, Moderate Effort
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Learn caching layers</li>
              <li>• Database partitioning</li>
              <li>• Load balancing</li>
            </ul>
          </div>
          <div className="p-4 border-2 border-yellow-300 rounded-lg">
            <h3 className="font-bold text-yellow-700 mb-2">
              High Impact, High Effort
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Scale calculations</li>
              <li>• Deep system analysis</li>
              <li>• Advanced architectures</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          The Path Forward
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-blue-700 mb-2">
              What This Score Means:
            </h3>
            <ul className="text-sm space-y-1 text-blue-600">
              <li>• Basic system design awareness but lack execution</li>
              <li>• Would likely not pass a real interview</li>
              <li>
                • Need 4-6 weeks of focused practice to reach interview-ready
                state (7/10+)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-blue-700 mb-2">Focus Areas:</h3>
            <ul className="text-sm space-y-1 text-blue-600">
              <li>• Communication skills and technical depth</li>
              <li>• Build confidence in articulating technical reasoning</li>
              <li>• Demonstrate deeper system knowledge</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>The foundation exists</strong> - your structure and basic
            API knowledge are strengths. Focus intensively on communication
            skills and technical depth. These two areas alone could raise your
            score to 6-7/10 within a month of dedicated practice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedback;
