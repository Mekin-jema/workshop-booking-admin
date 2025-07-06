import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const user = {
    name: "John Doe",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  // Sample data for charts
  const bookingData = [
    { name: "Jan", bookings: 40 },
    { name: "Feb", bookings: 65 },
    { name: "Mar", bookings: 78 },
    { name: "Apr", bookings: 90 },
    { name: "May", bookings: 110 },
    { name: "Jun", bookings: 120 },
  ];

  const workshopData = [
    { name: "Python 101", value: 45 },
    { name: "Web Dev", value: 30 },
    { name: "Data Science", value: 25 },
    { name: "UX Design", value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const recentBookings = [
    { id: 1, customer: "Alice Smith", workshop: "Python 101", time: "10:00 AM - 12:00 PM", date: "2023-07-15", status: "Confirmed" },
    { id: 2, customer: "Bob Johnson", workshop: "Web Dev", time: "2:00 PM - 4:00 PM", date: "2023-07-16", status: "Pending" },
    { id: 3, customer: "Charlie Brown", workshop: "Data Science", time: "9:00 AM - 11:00 AM", date: "2023-07-17", status: "Confirmed" },
    { id: 4, customer: "Diana Prince", workshop: "UX Design", time: "1:00 PM - 3:00 PM", date: "2023-07-18", status: "Canceled" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main content */}
      <main className="flex-grow p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex items-center space-x-4">
            <button
              className="relative text-gray-600 hover:text-gray-800 focus:outline-none"
              aria-label="Notifications"
            >
              🔔
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-indigo-600"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">Total Bookings</h3>
            <p className="text-3xl font-bold text-indigo-600">120</p>
            <p className="text-sm text-green-500 mt-1">↑ 12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">Slots Filled</h3>
            <p className="text-3xl font-bold text-indigo-600">85%</p>
            <p className="text-sm text-green-500 mt-1">↑ 5% from last week</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">Active Workshops</h3>
            <p className="text-3xl font-bold text-indigo-600">8</p>
            <p className="text-sm text-gray-500 mt-1">2 new this week</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">Revenue</h3>
            <p className="text-3xl font-bold text-indigo-600">$4,250</p>
            <p className="text-sm text-green-500 mt-1">↑ 18% from last month</p>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bookings Trend Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Bookings Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Workshop Popularity Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Workshop Popularity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workshopData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {workshopData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Recent Bookings Table */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workshop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.workshop}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === "Confirmed" ? "bg-green-100 text-green-800" :
                        booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Upcoming Workshops */}
        <section className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Upcoming Workshops</h3>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">Python 101</h4>
                    <p className="text-gray-600 text-sm">July 20, 2023</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">8 slots left</span>
                </div>
                <p className="text-gray-700 mt-2 text-sm">Learn Python basics in this introductory workshop...</p>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Time Slots:</span>
                    <span>3 available</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Total Capacity:</span>
                    <span>15 participants</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm">
                  Manage Workshop
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;