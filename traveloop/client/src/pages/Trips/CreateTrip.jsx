import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { useTripStore } from '../../store';
import { Button, Input } from '../../components/common';

const createTripSchema = z.object({
  name: z.string().min(2, 'Trip name must be at least 2 characters'),
  destination: z.string().min(2, 'Destination is required'),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Valid start date is required'),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Valid end date is required'),
  budget: z.number().optional(),
  description: z.string().optional(),
});

const CreateTrip = () => {
  const [loading, setLoading] = useState(false);
  const { createTrip } = useTripStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(createTripSchema),
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        toast.error('End date must be after start date');
      }
    }
  }, [startDate, endDate]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createTrip(data);
      toast.success('Trip created successfully!');
      navigate('/trips');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Trip</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <Input
          label="Trip Name"
          error={errors.name?.message}
          {...register('name')}
        />
        
        <Input
          label="Destination"
          error={errors.destination?.message}
          {...register('destination')}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            error={errors.startDate?.message}
            {...register('startDate')}
          />
          
          <Input
            label="End Date"
            type="date"
            error={errors.endDate?.message}
            {...register('endDate')}
          />
        </div>
        
        <Input
          label="Budget (optional)"
          type="number"
          error={errors.budget?.message}
          {...register('budget', { valueAsNumber: true })}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" loading={loading} className="flex-1">
            Create Trip
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/trips')}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
