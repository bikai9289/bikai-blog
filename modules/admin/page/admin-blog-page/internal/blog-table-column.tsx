'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { BlogListItem } from '@/actions/blogs/type'
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Eye,
  TagIcon,
  TypeIcon,
  Wrench,
} from 'lucide-react'
import TagItemBadge from '@/components/shared/tag-item-badge'
import { Button } from '@/components/ui/button'
import { prettyDateTime } from '@/lib/time'
import ActionButtons from './action-buttons'
import PublishToggleSwitch from './publish-toggle-switch'

export const columns: ColumnDef<BlogListItem>[] = [
  {
    accessorKey: 'title',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
          <TypeIcon className="size-4" />
          标题
        </span>
      )
    },
  },
  {
    accessorKey: 'tags',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
          <TagIcon className="size-4" />
          标签
        </span>
      )
    },
    cell: ({ row }) => {
      const tags = row.original.tags

      return (
        <div className="flex gap-1">
          {tags.map(tag => (
            <TagItemBadge tag={tag.tagName} key={tag.id} />
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'isPublished',
    header: () => {
      return (
        <span className="flex gap-1 items-center">
          <Eye className="size-4" />
          是否发布
        </span>
      )
    },
    cell: ({ row }) => {
      const blog = row.original

      return (
        <PublishToggleSwitch blogId={blog.id} isPublished={blog.isPublished} key={blog.id} />
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const sorted = column.getIsSorted()

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
          {sorted === 'asc'
            ? (
                <ArrowUp />
              )
            : sorted === 'desc'
              ? (
                  <ArrowDown />
                )
              : null}
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
        <span className="flex gap-1 items-center">
          <Wrench className="size-4" />
          操作
        </span>
      )
    },
    cell: ({ row }) => {
      const { id, slug, title } = row.original

      return <ActionButtons blogId={id} slug={slug} title={title} />
    },
  },
]
