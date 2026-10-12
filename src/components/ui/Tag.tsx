interface Props {
    children: React.ReactNode;
}

export default function Tag({children}: Props) {
    return (
        <>
            <div className="bg-primary text-surface-bright clip-cut-tl-sm w-fit p-2 px-4">
                {children}
            </div>
        </>
    )
}