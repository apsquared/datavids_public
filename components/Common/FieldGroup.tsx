

export default function FieldGroup({
    label,
    children,
  }: {
    label:string,
    children: React.ReactNode;
  }) {
    return (
    <div className="relative p-3 border border-gray-300 rounded-lg">


        <div className="absolute top-0 left-5 transform -translate-y-1/2 bg-gray-100 px-2">
            {label}
        </div>
        
    
        <div className="flex flex-col gap-6 p-2">
            {children}
        </div>
    </div>

    )
}