import React, { useState } from 'react';
import conf from './conf';

const AddCourse = ({ userId }) => {
    const [course, setCourse] = useState('');
    const [message, setMessage] = useState('');

    const validateCourseCode = (code) => {
        const regex = /^[a-zA-Z]{3}-\d{3}$/;
        return regex.test(code);
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();

        if (!validateCourseCode(course)) {
            setMessage('Course code must be in the format XYZ-123.');
            return;
        }
        if (!course.trim()) {
            setMessage('Course name cannot be empty.');
            return;
        }

        try {
            const response = await fetch(`${conf.apiUrl}/api/users/add-course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    course: course.trim(),
                }),
            });

            const data = await response.json();
            setMessage(data.message || 'Course added successfully!');
            setCourse('');
        } catch (error) {
            setMessage('Error adding course');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-center max-w-md w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500 opacity-50 rounded-lg"></div>
                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-6">Add New Course</h2>
                    <form onSubmit={handleAddCourse}>
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="Course Code (XYZ-123)"
                            className="border border-gray-300 rounded p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200"
                        >
                            Add Course
                        </button>
                    </form>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
