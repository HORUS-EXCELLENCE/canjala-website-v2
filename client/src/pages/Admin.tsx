import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, Upload, Trash2, Save } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect non-admin users
  if (!authLoading && (!user || user.role !== "admin")) {
    if (!user) {
      window.location.href = getLoginUrl();
      return null;
    }
    setLocation("/");
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black">CMS - Gestão de Conteúdo</h1>
          <p className="text-muted-foreground">Gerir todo o conteúdo do website Canjala</p>
        </div>

        <Tabs defaultValue="sections" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sections">Secções de Texto</TabsTrigger>
            <TabsTrigger value="media">Imagens & Vídeos</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="config">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="sections">
            <ContentSectionsManager />
          </TabsContent>

          <TabsContent value="media">
            <MediaManager />
          </TabsContent>

          <TabsContent value="stats">
            <FestivalStatsManager />
          </TabsContent>

          <TabsContent value="config">
            <SiteConfigManager />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Content Sections Manager Component
function ContentSectionsManager() {
  const { data: sections, refetch } = trpc.cms.contentSections.list.useQuery();
  const createMutation = trpc.cms.contentSections.create.useMutation();
  const updateMutation = trpc.cms.contentSections.update.useMutation();
  const deleteMutation = trpc.cms.contentSections.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    sectionKey: "",
    titlePt: "",
    titleEn: "",
    contentPt: "",
    contentEn: "",
  });

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Secção actualizada com sucesso");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Secção criada com sucesso");
      }
      refetch();
      setEditingId(null);
      setFormData({ sectionKey: "", titlePt: "", titleEn: "", contentPt: "", contentEn: "" });
    } catch (error) {
      toast.error("Erro ao guardar secção");
    }
  };

  const handleEdit = (section: any) => {
    setEditingId(section.id);
    setFormData({
      sectionKey: section.sectionKey,
      titlePt: section.titlePt || "",
      titleEn: section.titleEn || "",
      contentPt: section.contentPt || "",
      contentEn: section.contentEn || "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem a certeza que deseja eliminar esta secção?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Secção eliminada com sucesso");
      refetch();
    } catch (error) {
      toast.error("Erro ao eliminar secção");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Editar Secção" : "Nova Secção"}</CardTitle>
          <CardDescription>Adicionar ou editar conteúdo de secções do website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Chave da Secção</Label>
            <Input
              value={formData.sectionKey}
              onChange={(e) => setFormData({ ...formData, sectionKey: e.target.value })}
              placeholder="ex: hero_title, about_description"
              disabled={!!editingId}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Título (Português)</Label>
              <Input
                value={formData.titlePt}
                onChange={(e) => setFormData({ ...formData, titlePt: e.target.value })}
              />
            </div>
            <div>
              <Label>Título (English)</Label>
              <Input
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Conteúdo (Português)</Label>
              <Textarea
                value={formData.contentPt}
                onChange={(e) => setFormData({ ...formData, contentPt: e.target.value })}
                rows={5}
              />
            </div>
            <div>
              <Label>Conteúdo (English)</Label>
              <Textarea
                value={formData.contentEn}
                onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                rows={5}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
              <Save className="mr-2 h-4 w-4" />
              {editingId ? "Actualizar" : "Criar"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={() => {
                setEditingId(null);
                setFormData({ sectionKey: "", titlePt: "", titleEn: "", contentPt: "", contentEn: "" });
              }}>
                Cancelar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {sections?.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{section.sectionKey}</CardTitle>
                  <CardDescription>
                    PT: {section.titlePt || "—"} | EN: {section.titleEn || "—"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(section)}>
                    Editar
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(section.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Media Manager Component
function MediaManager() {
  const { data: mediaFiles, refetch } = trpc.cms.media.list.useQuery();
  const uploadMutation = trpc.cms.media.upload.useMutation();
  const deleteMutation = trpc.cms.media.delete.useMutation();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        const fileData = base64.split(",")[1]; // Remove data:image/jpeg;base64, prefix

        await uploadMutation.mutateAsync({
          fileName: file.name,
          fileType: file.type.startsWith("image/") ? "image" : "video",
          fileData,
          mimeType: file.type,
        });

        toast.success("Ficheiro carregado com sucesso");
        refetch();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Erro ao carregar ficheiro");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem a certeza que deseja eliminar este ficheiro?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Ficheiro eliminado com sucesso");
      refetch();
    } catch (error) {
      toast.error("Erro ao eliminar ficheiro");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carregar Novo Ficheiro</CardTitle>
          <CardDescription>Imagens e vídeos para o website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              disabled={uploadMutation.isPending}
            />
            {uploadMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {mediaFiles?.map((media) => (
          <Card key={media.id}>
            <CardContent className="p-4">
              {media.fileType === "image" ? (
                <img src={media.url} alt={media.fileName} className="w-full h-48 object-cover rounded-md mb-2" />
              ) : (
                <video src={media.url} className="w-full h-48 object-cover rounded-md mb-2" controls />
              )}
              <p className="text-sm font-medium truncate">{media.fileName}</p>
              <Button
                variant="destructive"
                size="sm"
                className="w-full mt-2"
                onClick={() => handleDelete(media.id)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Festival Stats Manager Component
function FestivalStatsManager() {
  const { data: stats, refetch } = trpc.cms.festivalStats.list.useQuery();
  const createMutation = trpc.cms.festivalStats.create.useMutation();
  const updateMutation = trpc.cms.festivalStats.update.useMutation();
  const deleteMutation = trpc.cms.festivalStats.delete.useMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    year: "",
    participants: 0,
    titlePt: "",
    titleEn: "",
    descriptionPt: "",
    descriptionEn: "",
  });

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({ id: editingId, ...formData });
        toast.success("Estatística actualizada");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Estatística criada");
      }
      refetch();
      setEditingId(null);
      setFormData({ year: "", participants: 0, titlePt: "", titleEn: "", descriptionPt: "", descriptionEn: "" });
    } catch (error) {
      toast.error("Erro ao guardar");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Editar Estatística" : "Nova Estatística"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Ano</Label>
              <Input
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2024 ou 2018-2020"
              />
            </div>
            <div>
              <Label>Participantes</Label>
              <Input
                type="number"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Título (PT)</Label>
              <Input
                value={formData.titlePt}
                onChange={(e) => setFormData({ ...formData, titlePt: e.target.value })}
              />
            </div>
            <div>
              <Label>Título (EN)</Label>
              <Input
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Descrição (PT)</Label>
              <Textarea
                value={formData.descriptionPt}
                onChange={(e) => setFormData({ ...formData, descriptionPt: e.target.value })}
              />
            </div>
            <div>
              <Label>Descrição (EN)</Label>
              <Textarea
                value={formData.descriptionEn}
                onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              />
            </div>
          </div>

          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {stats?.map((stat) => (
          <Card key={stat.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{stat.year}</CardTitle>
                  <CardDescription>{stat.participants} participantes</CardDescription>
                </div>
                <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutateAsync({ id: stat.id }).then(() => refetch())}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Site Config Manager Component
function SiteConfigManager() {
  const { data: configs, refetch } = trpc.cms.siteConfig.list.useQuery();
  const upsertMutation = trpc.cms.siteConfig.upsert.useMutation();

  const [formData, setFormData] = useState({
    configKey: "",
    valuePt: "",
    valueEn: "",
    description: "",
  });

  const handleSave = async () => {
    try {
      await upsertMutation.mutateAsync(formData);
      toast.success("Configuração guardada");
      refetch();
      setFormData({ configKey: "", valuePt: "", valueEn: "", description: "" });
    } catch (error) {
      toast.error("Erro ao guardar");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nova Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Chave</Label>
            <Input
              value={formData.configKey}
              onChange={(e) => setFormData({ ...formData, configKey: e.target.value })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Valor (PT)</Label>
              <Input
                value={formData.valuePt}
                onChange={(e) => setFormData({ ...formData, valuePt: e.target.value })}
              />
            </div>
            <div>
              <Label>Valor (EN)</Label>
              <Input
                value={formData.valueEn}
                onChange={(e) => setFormData({ ...formData, valueEn: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {configs?.map((config) => (
          <Card key={config.id}>
            <CardHeader>
              <CardTitle className="text-lg">{config.configKey}</CardTitle>
              <CardDescription>
                PT: {config.valuePt} | EN: {config.valueEn}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
