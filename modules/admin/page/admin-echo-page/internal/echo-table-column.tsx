'use client'

import type { Echo } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import {
  CalendarDays,
  Eye,
  Quote,
  TypeIcon,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { prettyDateTime } from '@/lib/time'
import ActionButtons from './action-buttons'
import PublishToggleSwitch from './publish-toggle-switch'

export const columns: ColumnDef<Echo>[] = [
  {
    accessorKey: 'content',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <TypeIcon className="size-4" />
          内容
        </span>
      )
    },
  },
  {
    accessorKey: 'reference',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Quote className="size-4" />
          来源
        </span>
      )
    },
    cell: ({ row }) => {
      const reference = row.original.reference.toString()
      return <span>{reference}</span>
    },
  },
  {
    accessorKey: 'isPublished',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Eye className="size-4" />
          是否发布
        </span>
      )
    },
    cell: ({ row }) => {
      return <PublishToggleSwitch echoId={row.original.id} isPublished={row.original.isPublished} key={row.original.id} />
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          <CalendarDays className="size-4" />
          创建时间
        </Button>
      )
    },
    cell: ({ row }) => {
      const prettyTime = prettyDateTime(row.original.createdAt)
      return <time>{prettyTime}</time>
    },
  },
  {
    accessorKey: 'actions',
    header: () => {
      return (
        <span className="flex gap-1 items-center dark:text-gray-200 text-gray-500">
          <Wrench className="size-4" />
          操作
        </span>
      )
    },
    cell: ({ row }) => {
      const { id, content, isPublished, reference } = row.original

      return (
        <ActionButtons
          content={content}
          id={id}
          isPublished={isPublished}
          reference={reference}
        />
      )
    },
  },
]
