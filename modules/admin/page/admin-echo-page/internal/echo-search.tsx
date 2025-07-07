'use client'

import type { Dispatch, SetStateAction } from 'react'
import { Plus, RotateCw, Search } from 'lucide-react'
import { memo, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/store/use-modal-store'

function EchoSearch({ setQuery }: { setQuery: Dispatch<SetStateAction<string>> }) {
  const { setModalOpen } = useModalStore()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className="flex gap-2">
      <Input
        placeholder="请输入引用喵~"
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

      <Button
        className="cursor-pointer"
        variant="secondary"
        onClick={() => {
          setModalOpen('createEchoModal')
        }}
      >
        <Plus />
        创建引用
      </Button>
    </section>
  )
}

export default memo(EchoSearch)
