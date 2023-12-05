import React, { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {  ChartContainer, DifficultyLabel, TimeLabel, StyledDropdown } from './Style/UserRecord.styles';



type DataPoint = {
    playNumber: number;
    score: number;
    timeSpent: string;
    difficulty: string;
    date: string;
};

// Sample data
const initialData: DataPoint[] = [
    // Populate with your game data
    { playNumber: 1, score: 80, timeSpent: '5 mins', difficulty: 'Easy', date: '2023-01-01' },
    { playNumber: 2, score: 70, timeSpent: '9 mins', difficulty: 'Medium', date: '2023-01-01' },
    { playNumber: 3, score: 70, timeSpent: '12 mins', difficulty: 'Easy', date: '2023-01-01' },
    { playNumber: 4, score: 60, timeSpent: '13 mins', difficulty: 'Hard', date: '2023-01-01' }
    // ... more data points
];

const MyScatterPlot: React.FC = () => {
    const [data, setData] = useState<DataPoint[]>(initialData);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('All');


    const filterData = () => {
        let filteredData = initialData;
        //
        if (selectedDifficulty !== 'All') {
            filteredData = filteredData.filter(point => point.difficulty = selectedDifficulty);
        }

        const currentDate = new Date();
        if (selectedTimeFrame !== 'All') {
            filteredData = filteredData.filter(point => {
                const pointDate = new Date(point.date);
                switch(selectedTimeFrame) {
                    case 'Day':
                        return pointDate.toDateString() === currentDate.toDateString();
                    case 'Month':
                        return pointDate.getMonth() === currentDate.getMonth();
                    case 'Year':
                        return pointDate.getFullYear() === currentDate.getFullYear();
                    default:
                        return true;
                }
            })
        }
        setData(filteredData);
    }

    useEffect(()=> {
        filterData();
    }, [selectedDifficulty, selectedTimeFrame]);

    // Function to handle difficulty selection
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(event.target.value);
    };

    // Function to handle time frame selection
    const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setSelectedTimeFrame(event.target.value);
    };

    return (
        <>
            <div>
                <DifficultyLabel>
                    Difficulty:
                    <StyledDropdown value={selectedDifficulty} onChange={handleDifficultyChange}>
                        <option value="All">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Insane">Insane</option>
                    </StyledDropdown>
                </DifficultyLabel>

                <TimeLabel>
                    Time Frame:
                    <StyledDropdown value={selectedTimeFrame} onChange={handleTimeFrameChange}>
                         <option value="All">All</option>
                        <option value="Day">Day</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                    </StyledDropdown>
                </TimeLabel>
            </div>
   
            <ChartContainer>
                <ResponsiveContainer width={650} height={550}>
                    <ScatterChart>
                        <CartesianGrid stroke="rgba(0, 0, 0, 0.8)"/>
                        <XAxis type="number" dataKey="playNumber" name="Number of Plays" />
                        <YAxis type="number" dataKey="score" name="Score" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={data} fill="#02661d" />
                    </ScatterChart>
                </ResponsiveContainer>
            </ChartContainer>
        </>
    );
};
export default MyScatterPlot;