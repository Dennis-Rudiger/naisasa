import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function CreateEvent() {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    price: '',
    capacity: '',
    category: '',
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      // Handle file upload
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-8">Create New Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
          >
            <input {...getInputProps()} />
            <PhotoIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              Drag & drop an image here, or click to select
            </p>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                className="input"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                rows={4}
                className="input"
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                className="input"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <input
                type="time"
                className="input"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                className="input"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (KES)</label>
              <input
                type="number"
                className="input"
                value={eventData.price}
                onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <input
                type="number"
                className="input"
                value={eventData.capacity}
                onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
