import React, { useEffect, useState } from "react";
import useMessageStore from "../../store/useMessageStore";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import DeleteDialog from "../../components/admin/DeleteDialog";
import { Trash2 } from "lucide-react";
import { Input } from "../../components/ui/input";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const MessagesPage = () => {
  const { messages, loading, fetchMessages, deleteMessage } = useMessageStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMessages.length / pageSize);
  const paginatedMessages = filteredMessages.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <Input
          type="text"
          placeholder="Search messages..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64"
        />
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>No Messages</CardTitle>
            <CardDescription>
              {search
                ? "No messages match your search."
                : "No messages have been received yet."}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <div className="overflow-x-auto w-full scrollbar-none">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="min-w-[160px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[300px]">Message</TableHead>
                  <TableHead className="min-w-[160px]">Date</TableHead>
                  <TableHead className="text-right min-w-[80px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMessages.map((msg, idx) => (
                  <TableRow
                    key={msg.id}
                    className={
                      `min-h-[56px] transition-colors group border-b last:border-0 ` +
                      ((idx + (page - 1) * pageSize) % 2 === 0
                        ? "bg-background"
                        : "bg-muted/40") +
                      " hover:bg-muted/60"
                    }
                  >
                    <TableCell className="text-muted-foreground font-mono align-middle">
                      {(page - 1) * pageSize + idx + 1}
                    </TableCell>
                    <TableCell
                      className="font-medium align-middle max-w-[180px] truncate"
                      title={msg.name}
                    >
                      {msg.name}
                    </TableCell>
                    <TableCell
                      className="align-middle text-muted-foreground max-w-[220px] truncate"
                      title={msg.email}
                    >
                      {msg.email}
                    </TableCell>
                    <TableCell
                      className="align-middle max-w-[320px] truncate"
                      title={msg.message}
                    >
                      {msg.message}
                    </TableCell>
                    <TableCell className="align-middle text-muted-foreground">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : ""}
                    </TableCell>
                    <TableCell className="align-middle">
                      <div className="flex gap-2 items-center justify-end">
                        <DeleteDialog
                          trigger={
                            <Button
                              size="icon"
                              variant="destructive"
                              className="cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          }
                          title="Delete Message"
                          description="Are you sure you want to delete this message? This action cannot be undone."
                          onConfirm={() => deleteMessage(msg.id)}
                          confirmText="Delete"
                          cancelText="Cancel"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-10">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                className="border rounded-md p-1 text-sm bg-background"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                &lt; Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  size="sm"
                  variant={page === i + 1 ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next &gt;
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessagesPage;
