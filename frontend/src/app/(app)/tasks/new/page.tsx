export default function NewTaskPage() {
  return (
    <div className="h-screen bg-[#F4F4F5] overflow-hidden flex">
      {/* LEFT HALF - FORM */}
      <div className="w-full overflow-y-auto custom-scrollbar">
        <div className="">
          {/* Logo */}
          <div className="mb-[-50px]">
            <h1 className="text-3xl p-5 font-bold text-gray-900">New Task</h1>
          </div>

          <div className="rounded-lg p-8 m-10 ms-0 me-40">
            <form className="space-y-8">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type*
                </label>
                <select className="w-full px-3 py-3 rounded focus:outline-none bg-white">
                  <option value="">Select a task type</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="content">Content Writing</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border bg-white border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="Enter task name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 min-h-[120px]"
                  placeholder="Enter task description"
                />
              </div>

              {/* Client */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client *
                </label>
                <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white">
                  <option value="">Select a client</option>
                  <option value="client1">Client A</option>
                  <option value="client2">Client B</option>
                  <option value="client3">Client C</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  placeholder="mm/dd/yyyy"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 bg-[#6027C4] text-white font-medium rounded transition-colors"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}