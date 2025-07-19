import React from 'react';
import Modal from './Modal';
import { Notification } from '../types';
import { BellIcon } from './icons';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose, notifications, setNotifications }) => {

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="max-h-[60vh] overflow-y-auto -mx-6 px-6">
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map(notif => (
              <li 
                key={notif.id} 
                className={`flex items-start space-x-4 p-3 rounded-lg ${!notif.read ? 'bg-primary-light' : 'bg-slate-50'}`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <BellIcon className={`w-5 h-5 ${!notif.read ? 'text-primary' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${!notif.read ? 'text-primary-dark' : 'text-slate-800'}`}>{notif.title}</p>
                  <p className="text-sm text-slate-600">{notif.description}</p>
                  <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-slate-500">
            <BellIcon className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p>You have no new notifications.</p>
          </div>
        )}
      </div>
      {notifications.some(n => !n.read) && (
        <div className="mt-6 text-right">
            <button
                onClick={handleMarkAllAsRead}
                className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-hover transition-colors text-sm"
            >
                Mark All as Read
            </button>
        </div>
      )}
    </Modal>
  );
};

export default NotificationModal;
