import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AreaChart, Card, EventProps, SearchSelect, SearchSelectItem } from "@tremor/react";
import React, { useRef, useEffect, useState } from 'react';
import Map from "../components/Maps";
import "mapbox-gl/dist/mapbox-gl.css";

const inter = Inter({ subsets: ["latin"] });

interface DataPoint {
  date: string;
  value: number;
}

type DataPointList = DataPoint[];

export default function HomePage() {
  const [value, setValue] = useState<null | EventProps>(null);
  const [selectedValue, setSelectedValue] = useState<string>('adasa/CHL-01');
  const [repo, setRepo] = useState<DataPointList>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/timeseriesdata/${selectedValue}/CHL-01`);
        const data: DataPointList = await res.json();
        setRepo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedValue]);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 pt-4">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Area chart
        </h2>
      </div>

      <div className="mb-4 mt-8 text-center font-mono text-sm text-slate-500">
        SearchSelect
      </div>

      <SearchSelect onValueChange={handleSelectChange} value={selectedValue}>
        <SearchSelectItem value="adasa">adasa</SearchSelectItem>
        <SearchSelectItem value="adasa/CHL-02">Option 2</SearchSelectItem>
        <SearchSelectItem value="adasa/CHL-03">Option 3</SearchSelectItem>
      </SearchSelect>

      <div className="mt-12">
        <Card>
          <AreaChart
            data={repo}
            index="date"
            categories={["value"]}
            onValueChange={(v: EventProps) => setValue(v)}
          />
        </Card>
      </div>

      <div>
        <Card>
          <Map />
        </Card>
      </div>
    </main>
  );
}