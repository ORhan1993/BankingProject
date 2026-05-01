// frontend/src/pages/Admin/Logs.jsx
import React, { useState } from 'react';
import { Search, Filter, Download, Terminal, AlertTriangle, Info, XCircle } from 'lucide-react';

const logsData = [
    { id: 1, time: '10:45:22', level: 'ERROR', service: 'PaymentGateway', msg: 'Connection timeout (504) - API unreachable' },
    { id: 2, time: '10:42:10', level: 'WARN', service: 'AuthService', msg: 'Failed login attempt IP: 192.168.1.55' },
    { id: 3, time: '10:30:00', level: 'INFO', service: 'Transaction', msg: 'Batch settlement completed successfully' },
    { id: 4, time: '10:15:45', level: 'INFO', service: 'UserMgmt', msg: 'New user created: ID #9921' },
];

const Logs = () => {
    const [filter, setFilter] = useState('ALL');

    return (
        <div className="bg-[#1e1e1e] min-h-[calc(100vh-100px)] rounded-xl text-gray-300 font-mono shadow-2xl overflow-hidden flex flex-col">
            {/* TERMİNAL HEADER */}
            <div className="bg-[#2d2d2d] px-4 py-3 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <Terminal size={18} className="text-green-500" />
                    <span className="font-bold text-sm text-gray-200">system_logs.log</span>
                </div>
                <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-600 rounded"><Download size={16}/></button>
                    <button className="p-1 hover:bg-gray-600 rounded"><Filter size={16}/></button>
                </div>
            </div>

            {/* İÇERİK */}
            <div className="p-4 overflow-auto flex-1 space-y-1">
                {logsData.map((log) => (
                    <div key={log.id} className="flex gap-4 text-xs md:text-sm hover:bg-white/5 p-1 rounded cursor-default">
                        <span className="text-gray-500 select-none">[{log.time}]</span>
                        <span className={`w-12 font-bold ${
                            log.level === 'ERROR' ? 'text-red-500' :
                                log.level === 'WARN' ? 'text-yellow-500' : 'text-blue-400'
                        }`}>{log.level}</span>
                        <span className="text-purple-400 w-32">{log.service}</span>
                        {/* DÜZELTME: > işareti {' > '} veya &gt; şeklinde yazılmalı */}
                        <span className="text-gray-300 flex-1">{'>'} {log.msg}</span>
                    </div>
                ))}
                <div className="animate-pulse text-green-500 mt-2">_</div>
            </div>
        </div>
    );
};

export default Logs;