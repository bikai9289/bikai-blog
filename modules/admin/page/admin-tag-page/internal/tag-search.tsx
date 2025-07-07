'use client'

import type { Dispatch, SetStateAction } from 'react'
import { Plus, RotateCw, Search } from 'lucide-react'
import { memo, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useModalStore } from '@/store/use-modal-store'

function TagSearch({ setQuery }: { setQuery: Dispatch<SetStateAction<string>> }) {
  const { setModalOpen } = useModalStore()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex gap-2">
      <Input
        className="w-1/2 xl:w-1/3"
        placeholder="请输入标签名喵~"
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
        className="cursor-pointer"
        onClick={() => {
          const query = inputRef.current?.value
          if (query?.trim()) {
            setQuery(query)
          }
        }}
      >
        <Search />
        搜索
      </Button>

      <Button
        variant="secondary"
        className="cursor-pointer"
        onClick={() => {
          setQuery('')
        }}
      >
        <RotateCw />
        重置
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          setModalOpen('createTagModal')
        }}
        className="cursor-pointer"
      >
        <Plus />
        新建标签
      </Button>
    </div>
  )
}

export default memo(TagSearch)
