import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AreaChart, Card, EventProps,   SearchSelect,  SearchSelectItem } from "@tremor/react";
import React, { useRef, useEffect, useState } from 'react';
import Map from "../components/Maps";
import "mapbox-gl/dist/mapbox-gl.css";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import classes from "./Page.module.css";


	

const inter = Inter({ subsets: ["latin"] });



// Define an interface for the dictionary object
interface DataPoint {
  date: string;
  value: number;
}

// Define a type alias for the list of dictionaries
type DataPointList = DataPoint[];


export const getServerSideProps = (async () => {
  // Fetch data from external API
  const res = await fetch('http://127.0.0.1:8000/timeseriesdata/adasa/CHL-01')
  const repo: DataPointList = await res.json()
  // Pass data to the page via props
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: DataPointList }>



export default function HomePage({repo,}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [value, setValue] = useState<null | EventProps>(null);
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
        <SearchSelect>
          <SearchSelectItem value="1">
            Option 1
          </SearchSelectItem>
          <SearchSelectItem value="2">
            Option 2
          </SearchSelectItem>
        <SearchSelectItem value="3">
          Option 3
        </SearchSelectItem>
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
