'use client'

import type { Dispatch, SetStateAction } from 'react'
import { Plus, RotateCw, Search } from 'lucide-react'
import Link from 'next/link'
import { memo, useRef } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

function NoteSearch({ setQuery }: { setQuery: Dispatch<SetStateAction<string>> }) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className="flex gap-2">
      <Input
        placeholder="请输入标题喵~"
        className="w-1/2 xl:w-1/3"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const query = inputRef.current?.value
            if (query?.trim()) {
              setQuery(query)
            }
            else {
              setQuery('')
            }
          }
        }}
      />

      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          const query = inputRef.current?.value
          if (query?.trim()) {
            setQuery(query)
          }
        }}
        className="cursor-pointer"
      >
        <Search />
        搜索
      </Button>

      <Button
        variant="secondary"
        onClick={() => {
          setQuery('')
        }}
        className="cursor-pointer"
      >
        <RotateCw />
        重置
      </Button>

      <Link
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'cursor-pointer',
        )}
        href="note/edit"
      >
        <Plus />
        创建笔记
      </Link>
    </section>
  )
}

export default memo(NoteSearch)
