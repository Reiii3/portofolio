interface Props {
    children: React.ReactNode;
}

export default function Tag({children}: Props) {
    return (
        <>
            <div className="bg-primary text-surface-bright clip-cut-tl-sm w-fit p-1 px-3">
                {children}
            </div>
        </>
    )
}