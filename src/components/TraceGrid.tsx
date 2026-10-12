"use client"

import { useEffect, useRef } from "react"

type Cell = { x: number; y: number; life: number; speed: number }

export default function TraceGridBackground({ size = 40 }: { size?: number }) {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = ref.current!
        const ctx = canvas.getContext("2d")!
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const css = getComputedStyle(document.documentElement)
        const color = css.getPropertyValue("--color-primary").trim() || "#cfbcff"
        const line = css.getPropertyValue("--color-board-line").trim() || "#4a4458"

        let w = 0, h = 0, cols = 0, rows = 0, raf = 0, visible = true
        let cells: Cell[] = []

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            w = canvas.clientWidth
            h = canvas.clientHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            cols = Math.ceil(w / size)
            rows = Math.ceil(h / size)
            cells = []
        }

        const spawn = () => {
            // 1-3 kotak, kadang digabung jadi bentuk L / persegi panjang
            const x = Math.floor(Math.random() * cols)
            const y = Math.floor(Math.random() * rows)
            const speed = 0.004 + Math.random() * 0.008
            cells.push({ x, y, life: 0, speed })
            if (Math.random() < 0.5) cells.push({ x: x + 1, y, life: -0.1, speed })
            if (Math.random() < 0.3) cells.push({ x, y: y + 1, life: -0.2, speed })
        }

        const drawGrid = () => {
            ctx.strokeStyle = line
            ctx.globalAlpha = 0.35
            ctx.lineWidth = 1
            ctx.beginPath()
            for (let x = 0; x <= cols; x++) { ctx.moveTo(x * size + 0.5, 0); ctx.lineTo(x * size + 0.5, h) }
            for (let y = 0; y <= rows; y++) { ctx.moveTo(0, y * size + 0.5); ctx.lineTo(w, y * size + 0.5) }
            ctx.stroke()
        }

        const frame = () => {
            raf = requestAnimationFrame(frame)
            if (!visible) return
            ctx.clearRect(0, 0, w, h)
            drawGrid()

            if (Math.random() < 0.06 && cells.length < 40) spawn()

            ctx.fillStyle = color
            cells = cells.filter((c) => c.life < 1)
            for (const c of cells) {
                c.life += c.speed
                if (c.life < 0) continue
                // naik lalu turun (0 -> 1 -> 0)
                const a = Math.sin(c.life * Math.PI)
                ctx.globalAlpha = a * 0.18
                ctx.fillRect(c.x * size + 1, c.y * size + 1, size - 1, size - 1)
            }
            ctx.globalAlpha = 1
        }

        resize()
        if (reduce) { drawGrid(); return }

        const ro = new ResizeObserver(resize)
        ro.observe(canvas)
        const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
        io.observe(canvas)
        raf = requestAnimationFrame(frame)

        return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
    }, [size])

    return (
        <canvas
            ref={ref}
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            style={{
                maskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            }}
        />
    )
}