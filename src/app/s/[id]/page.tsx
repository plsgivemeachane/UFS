import { Metadata, ResolvingMetadata } from 'next'

import Share from "./GeneratePage";
import imageFactory from '@/app/app/IconManager';

export default function Page({ params }: { params: { id: string } }){
  return <div><Share params={params} /></div>
}