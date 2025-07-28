import React, { useEffect, useState } from "react";
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
import AddCategoryDialog from "../../components/admin/AddCategoryDialog";
import EditCategoryDialog from "../../components/admin/EditCategoryDialog";
import DeleteDialog from "../../components/admin/DeleteDialog";
import { Input } from "../../components/ui/input";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const CategoriesPage = () => {
  const { categories, loading, fetchCategories, deleteCategory } =
    useCategoryStore();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCategories.length / pageSize);
  const paginatedCategories = filteredCategories.slice(
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
        <h1 className="text-2xl font-bold">Categories</h1>
        <AddCategoryDialog
          trigger={<Button className="cursor-pointer">Add Category</Button>}
        />
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
        <Input
          type="text"
          placeholder="Search categories..."
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
      ) : filteredCategories.length === 0 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>No Categories</CardTitle>
            <CardDescription>
              {search
                ? "No categories match your search."
                : "You have not created any categories yet. Get started by adding your first category."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddCategoryDialog
              trigger={<Button className="cursor-pointer">Add Category</Button>}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="overflow-x-auto w-full scrollbar-none">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="min-w-[200px]">Name</TableHead>
                  <TableHead className="text-right min-w-[120px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.map((cat, idx) => (
                  <TableRow
                    key={cat.id}
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
                      className="font-medium align-middle max-w-[240px] truncate"
                      title={cat.name}
                    >
                      {cat.name}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-end align-middle min-w-[120px]">
                      <EditCategoryDialog
                        trigger={
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer"
                          >
                            Edit
                          </Button>
                        }
                        category={cat}
                      />
                      <DeleteDialog
                        trigger={
                          <Button
                            size="sm"
                            variant="destructive"
                            className="cursor-pointer"
                          >
                            Delete
                          </Button>
                        }
                        title="Delete Category"
                        description="Are you sure you want to delete this category? This action cannot be undone."
                        onConfirm={() => deleteCategory(cat.id)}
                        confirmText="Delete"
                        cancelText="Cancel"
                      />
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

export default CategoriesPage;
