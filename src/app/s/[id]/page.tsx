import Share from "./GeneratePage";

export default function Page({ params }: { params: { id: string } }){
  return <div><Share params={params} /></div>
}