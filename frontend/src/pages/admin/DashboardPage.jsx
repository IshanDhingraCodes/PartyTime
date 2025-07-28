import React, { useEffect } from "react";
import {
  Card,
  CardContent,
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
import { Skeleton } from "../../components/ui/skeleton";
import { MessageCircle, Layers, Gift, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCategoryStore from "../../store/useCategoryStore";
import useDecorationStore from "../../store/useDecorationStore";
import useMessageStore from "../../store/useMessageStore";

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    categories,
    loading: loadingCategories,
    fetchCategories,
  } = useCategoryStore();
  const {
    decorations,
    loading: loadingDecorations,
    fetchDecorations,
  } = useDecorationStore();
  const {
    messages,
    loading: loadingMessages,
    fetchMessages,
  } = useMessageStore();

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
    if (decorations.length === 0) fetchDecorations();
    if (messages.length === 0) fetchMessages();
    // eslint-disable-next-line
  }, []);

  const summary = [
    {
      label: "Categories",
      value: loadingCategories ? null : categories.length,
      icon: <Layers className="w-6 h-6 text-primary" />,
      color: "bg-muted",
      to: "/admin/categories",
    },
    {
      label: "Decorations",
      value: loadingDecorations ? null : decorations.length,
      icon: <Gift className="w-6 h-6 text-primary" />,
      color: "bg-muted",
      to: "/admin/decorations",
    },
    {
      label: "Messages",
      value: loadingMessages ? null : messages.length,
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      color: "bg-muted",
      to: "/admin/messages",
    },
  ];

  const recentMessages = messages
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="max-w-7xl w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {summary.map((item) => (
          <Card
            key={item.label}
            className="group cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(item.to)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg md:text-sm lg:text-lg font-semibold flex items-center gap-2">
                {item.icon}
                {item.label}
              </CardTitle>
              <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardHeader>
            <CardContent>
              {item.value === null ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <span className="text-3xl font-bold">{item.value}</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="bg-card rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Messages</h2>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer"
            onClick={() => navigate("/admin/messages")}
          >
            View All
          </Button>
        </div>
        {loadingMessages ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : recentMessages.length === 0 ? (
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>No Messages</CardTitle>
              <CardDescription>
                No messages have been received yet.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="overflow-x-auto w-full scrollbar-none">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="min-w-[160px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[300px]">Message</TableHead>
                  <TableHead className="min-w-[160px]">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentMessages.map((msg, idx) => (
                  <TableRow key={msg.id}>
                    <TableCell className="text-muted-foreground font-mono align-middle">
                      {idx + 1}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
