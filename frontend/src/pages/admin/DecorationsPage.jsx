import React, { useEffect, useState } from "react";
import useDecorationStore from "../../store/useDecorationStore";
import useCategoryStore from "../../store/useCategoryStore";
import { Skeleton } from "../../components/ui/skeleton";
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
import { Input } from "../../components/ui/input";
import AddDecorationDialog from "../../components/admin/AddDecorationDialog";
import EditDecorationDialog from "../../components/admin/EditDecorationDialog";
import DeleteDialog from "../../components/admin/DeleteDialog";
import { Pencil, Trash2 } from "lucide-react";

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const DecorationsPage = () => {
  const { decorations, loading, fetchDecorations, deleteDecoration } =
    useDecorationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchDecorations();
    if (categories.length === 0) fetchCategories();
  }, [fetchDecorations, fetchCategories, categories.length]);

  const filteredDecorations = decorations.filter((dec) => {
    const matchesTitle = dec.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter
      ? dec.categoryId === categoryFilter
      : true;
    return matchesTitle && matchesCategory;
  });

  const totalPages = Math.ceil(filteredDecorations.length / pageSize);
  const paginatedDecorations = filteredDecorations.slice(
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
        <h1 className="text-2xl font-bold">Decorations</h1>
        <AddDecorationDialog
          trigger={<Button className="cursor-pointer">Add Decoration</Button>}
        />
      </div>
      <div className="flex flex-col sm:flex-row md:items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64"
        />
        <select
          className="w-full md:w-48 border rounded-md p-2 text-sm bg-background"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : filteredDecorations.length === 0 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>No Decorations</CardTitle>
            <CardDescription>
              No decorations found. Try adjusting your search or filter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddDecorationDialog
              trigger={
                <Button className="cursor-pointer">Add Decoration</Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="overflow-x-auto w-full scrollbar-none">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-20 text-center">Image</TableHead>
                  <TableHead className="min-w-[160px]">Title</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="min-w-[200px]">Description</TableHead>
                  <TableHead className="text-right min-w-[120px]">
                    Original Price
                  </TableHead>
                  <TableHead className="text-right min-w-[140px]">
                    Discounted Price
                  </TableHead>
                  <TableHead className="text-right min-w-[100px]">
                    Discount %
                  </TableHead>
                  <TableHead className="text-right w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDecorations.map((dec, idx) => {
                  const imageUrl =
                    dec.imageUrl && !dec.imageUrl.startsWith("http")
                      ? backendUrl.replace(/\/$/, "") + dec.imageUrl
                      : dec.imageUrl;
                  const categoryName =
                    dec.category?.name ||
                    categories.find((cat) => cat.id === dec.categoryId)?.name ||
                    dec.categoryId;
                  return (
                    <TableRow
                      key={dec.id}
                      className={
                        `min-h-[72px] transition-colors group border-b last:border-0 ` +
                        ((idx + (page - 1) * pageSize) % 2 === 0
                          ? "bg-background"
                          : "bg-muted/40") +
                        " hover:bg-muted/60"
                      }
                    >
                      <TableCell className="w-20 text-center align-middle">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={dec.title}
                            className="w-14 h-14 object-cover rounded-md border mx-auto"
                          />
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            No image
                          </span>
                        )}
                      </TableCell>
                      <TableCell
                        className="font-medium align-middle max-w-[180px] truncate"
                        title={dec.title}
                      >
                        {dec.title}
                      </TableCell>
                      <TableCell
                        className="align-middle text-muted-foreground max-w-[120px] truncate"
                        title={categoryName}
                      >
                        {categoryName}
                      </TableCell>
                      <TableCell
                        className="align-middle max-w-[240px] truncate"
                        title={dec.description}
                      >
                        {dec.description}
                      </TableCell>
                      <TableCell className="text-right align-middle">
                        ${dec.originalPrice}
                      </TableCell>
                      <TableCell className="text-right align-middle">
                        ${dec.discountedPrice}
                      </TableCell>
                      <TableCell className="text-right align-middle text-muted-foreground">
                        {dec.discountPercentage
                          ? `${dec.discountPercentage}%`
                          : ""}
                      </TableCell>
                      <TableCell className="align-middle">
                        <div className="flex gap-2 items-center justify-end">
                          <EditDecorationDialog
                            trigger={
                              <Button
                                size="icon"
                                variant="outline"
                                className="cursor-pointer"
                                title="Edit"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            }
                            decoration={dec}
                          />
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
                            title="Delete Decoration"
                            description="Are you sure you want to delete this decoration? This action cannot be undone."
                            onConfirm={() => deleteDecoration(dec.id)}
                            confirmText="Delete"
                            cancelText="Cancel"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
                onClick={() => setPage(page - 1)}
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
                  onClick={() => setPage(i + 1)}
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

export default DecorationsPage;
