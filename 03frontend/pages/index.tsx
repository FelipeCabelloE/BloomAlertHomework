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

type DataPointList = [DataPoint[], DataPoint[]];

export default function HomePage() {
  const [value, setValue] = useState<null | EventProps>(null);
  const [selectedValue, setSelectedValue] = useState<string>('adasa/CHL-01');
  const [repo, setRepo] = useState<DataPointList>([[],[]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res_chl01 = await fetch(`http://127.0.0.1:8000/timeseriesdata/${selectedValue}/CHL-01`);
        const data_chl01: DataPoint[] = await res_chl01.json();
        const res_spm01 = await fetch(`http://127.0.0.1:8000/timeseriesdata/${selectedValue}/SPM-01`);
        const data_spm01: DataPoint[] = await res_spm01.json();
        setRepo([data_chl01, data_spm01]);
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
        Welcome to your Dashboard<br/> 
        </h2>
        <div className="mb-4 mt-0 text-left font-mono text-sm text-slate-500">
        by Bloom alert & Felipe Cabello
      </div>
      <div className="mb-4 mt-2 text-left font-mono text-sm text-slate-500">
        Created using: Fastapi, Nextjs, Duckdb
      </div>
      </div>

      <div className="mb-4 mt-8 text-center font-mono text-sm text-slate-500">
        Please, select your organization
      </div>

      <SearchSelect onValueChange={handleSelectChange} value={selectedValue}>
        <SearchSelectItem value="adasa">Adasa</SearchSelectItem>
        <SearchSelectItem value="gsinima">Gsinima</SearchSelectItem>
      </SearchSelect>

      <div className="mt-12">
        <Card>
          <AreaChart
            data={repo[0]}
            index="date"
            categories={["value"]}
            onValueChange={(v: EventProps) => setValue(v)}
          />
        </Card>
      </div>
      <div className="mt-12">
        <Card>
          <AreaChart
            data={repo[1]}
            index="date"
            categories={["value"]}
            onValueChange={(v: EventProps) => setValue(v)}
          />
        </Card>
      </div>
      <div className="mt-12">
        <Card>
          <Map />
        </Card>
      </div>
    </main>
  );
}