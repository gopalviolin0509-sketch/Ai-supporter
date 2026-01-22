import { motion } from 'framer-motion';
import { Activity, MessageSquare, Zap, Target } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-center space-x-4"
  >
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 font-inter">Welcome back, John</h1>
        <p className="text-slate-500 mt-1">Here is what's happening with your brand platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value="1,284" icon={Zap} color="bg-amber-500" />
        <StatCard title="AI Interactions" value="85" icon={MessageSquare} color="bg-blue-500" />
        <StatCard title="Brand Health" value="94%" icon={Activity} color="bg-emerald-500" />
        <StatCard title="Target Reach" value="12.4k" icon={Target} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-border shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Recent Brand Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold italic">#{i}</div>
                  <div>
                    <p className="font-semibold text-slate-700 italic">Campaign Copy Generated</p>
                    <p className="text-sm text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">AI Analysis</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-secondary p-8 rounded-xl text-white shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl mb-2">Pro Tip</h3>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              Use the AI Assistant to refine your brand tone. Try asking: "What are 5 keywords that describe our target audience?"
            </p>
          </div>
          <button className="w-full mt-6 py-3 bg-primary hover:bg-blue-600 rounded-lg font-bold transition-all">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
